import configparser


def get_config(path, section):
    config = configparser.ConfigParser()
    config.read(path)
    config.options(section)

    dict1 = {}
    options = config.options(section)

    for option in options:
        try:
            dict1[option] = config.get(section, option)
            if dict1[option] == -1:
                DebugPrint("skip: %s" % option)
        except Exception:
            print("exception on %s!" % option)
            dict1[option] = None
    return dict1


