import click
import select
import socket
from datetime import datetime

import sys
from config.config_reader import get_config
from tools import *


def connect_socket():
    try:

        readable = [s]
        i = 0
        while True:
            # r will be a list of sockets with readable data
            r, w, e = select.select(readable, [], [], 0)
            for rs in r:  # iterate through readable sockets
                if rs is s:  # is it the server
                    c, a = s.accept()
                    readable.append(c)  # add the client
                else:
                    # read from a client
                    data = rs.recv(1024).decode('utf-8')
                    if not data:
                        readable.remove(rs)
                        rs.close()
                    else:
                        if "signature" in data.strip():
                            interference = json.loads(data.strip())
                            status = interference["status"]
                            if str(status) == "1":
                                global sig_leave
                                sig_leave = interference
                            else:
                                global sig_forfeit
                                sig_forfeit = interference

                        else:
                            start_time = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
                            print('\r->'+start_time+"\t"+data)
                        if 'exit' in data.strip() or 'banned' in data.strip():
                            readable.remove(rs)
                            rs.close()
                            return data.strip()

            i += 1
            print('/-\|'[i % 4] + '\r', end='', flush=True)
    except KeyboardInterrupt:
        raise
    except Exception:
        raise


@click.command()
@click.option('--node_url',
              prompt=True,
              default=default['http_provider'],
              help='Http provider for worker.')
@click.option('--wallet',
              prompt=True,
              default=default['wallet'],
              help="The worker's wallet address.")
@click.option('--ledger_url',
              prompt=True,
              default=default['host'],
              help="The URL to which the worker connects.")
@click.option('--price_limit',
              prompt=True,
              default=default['price_limit'],
              help="The minimum price asking for.")
def data_prepare(node_url, wallet, ledger_url, price_limit):
    global container_state

    node_url = node_url.strip()
    wallet = wallet.strip()
    ledger_url = ledger_url.strip()
    price_limit = price_limit.strip()

    # input validation
    # check input wallet address if starting with "0x"
    try:
        if wallet:
            if wallet.startswith("0x"):
                wallet = wallet[2:]
            if not validate_wallet(wallet):
                print('Sorry, the Wallet Address is invalid, Please input again')
                sys.exit(0)
        else:
            print('Sorry, the Wallet Address is invalid, Please input again')
            sys.exit(0)

        # check input node_url
        if not validate_url(node_url):
            print('Sorry, the Node URL is invalid, Please input again')
            sys.exit(0)

        # check input ledger_url
        if not validate_url(ledger_url):
            print('Sorry, the Ledger URL is invalid, Please input again')
            sys.exit(0)

        # check input price_limit
        if not validate_price_limit(price_limit):
            print('Sorry, the price Limit is invalid, Please input again')
            sys.exit(0)
        save_data(node_url, wallet, ledger_url, price_limit)
    except Exception as err:
        print("Input data Error, Worker exited! {}".format(err))
        sys.exit(0)
    else:
        while True:
            if not container_state:
                try:
                    manage()

                    print('\nWorker is initiating...')
                    global sig_leave
                    sig_leave = None
                    global sig_forfeit
                    sig_forfeit = None
                    container_msg = connect_socket()

                    if 'exit' in container_msg:
                        rm_container()
                        time.sleep(2)
                        container_state = False
                        continue
                    else:
                        rm_container()
                        time.sleep(2)
                        container_state = False
                        continue
                        # sys.exit(0)
                except KeyboardInterrupt:
                    os.system('docker kill --signal=SIGINT worker')
                    if sig_forfeit is not None:
                        forfeit_q(sig_forfeit)
                        leave_q(sig_leave)
                    elif sig_leave is not None:
                        leave_q(sig_leave)
                    else:
                        pass
                    # close container
                    rm_container()
                    time.sleep(2)
                    container_state = True
                    print("Keyboard Interrupted by Worker!")
                    sys.exit(0)
                   
                except Exception as err:
                    # close socket
                    rm_container()
                    time.sleep(2)
                    container_state = True
                    print("Fatal errors occurred, Worker exited! {}".format(err))
                    sys.exit(0)


default = read_from_config('config/config.ini')
container_state = False
sig_leave, sig_forfeit = None, None


def tcp_socket(tcp_port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind(('0.0.0.0', tcp_port))
    sock.listen(1)
    return sock


if __name__ == "__main__":
    tcp_port = int(get_config("config/config.ini", "miner")["tcp_port"])
    try:
        s = tcp_socket(tcp_port)
    except KeyboardInterrupt:
        print("Keyboard Interrupted by Worker!")
        sys.exit(0)
    except OSError as e:
        print("Sorry, the communication port is already in use, please try again.")
        try:
            output = subprocess.call(["fuser", "-k", "{}/tcp".format(tcp_port)]
                                     , stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        except Exception:
            raise RuntimeError

    except Exception as e:
        print("Fatal errors occurred, Worker exited! {}".format(e))
        sys.exit(0)

    else:
        data_prepare()
