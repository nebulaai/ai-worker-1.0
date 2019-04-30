"""Her are the global variables used across files"""
# miner's status code sending with heart beat to server
from os import path

from nebula.config.config_reader import get_config

HB_IDLE = 1
HB_BUSY = 2
HB_COMPLETED = 3
HB_ERROR = 4
HB_INTERRUPT = 5


NetworkError = "400100"
FileUploadingError = "400120"
FileDownloadingError = "400121"


FileNotFoundError = "404101"
FileUnzipError = "400102"
FileZipError = "400103"
LargeFileError = "400104"
ScriptTimeoutException = "400105"
ScriptRemovedException = "400106"
ScriptRunningError = "400107"
MiscellaneousError = "400108"

CompleteWithoutContractException = "500101"
Web3signatureError = "500102"
CompleteWithoutReportStartException = "500103"
ReportStartBeforeJoinException = "500104"
TaskInfoException = "500105"


HardwareError = "500106"
HeartbeatError = "500107"
MinerError = "500103"
MinerRuntimeError = "500108"
MinerJoinException = "500109"

KeyboardInterrupt = "500110"
SystemExit = "500111"

InternalServerError = "500120"
InvalidWeb3ProviderException = "500121"


timeout = 15
# max_waiting_loop = 8
PASS = "password for generating a miner's temporary id"
host_path = path.join(path.dirname(path.dirname(__file__)), "config/config.ini")
http_provider = get_config(host_path, "providers")["http_provider"]
# API mapping
host = get_config(host_path, "miner")["host"]
host_worker = host + "/worker/"
host_worker_join = host_worker + "join"
# database table where the miner sends its heart beat regularly (15 sec.)
host_worker_heartbeat = host_worker + "heartbeat"
# database table where the miner sends its status(start to doing a task)
host_worker_start = host_worker + "start"
# database table where the miner sends its status(completing a task)
host_worker_complete = host_worker + "complete"
# database table where the miner sends its status(error occurred)
host_worker_error = host_worker + "error"
# quit after assigned a task
host_worker_forfeit = host_worker + "forfeit"
# quit before assigned a task
host_worker_leave = host_worker + "leave"

# database table where stores available tasks info
host_tasks = host + "/tasks/"
# database table where stores the contract address
host_contract = host + "contract/address/"


