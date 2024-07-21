import platform, os, json

def get_system():
    return platform.system()

def get_app_data_directory():
    system = get_system()
    if system == "Windows":
        app_data_dir = os.getenv('APPDATA')
    elif system == "Darwin":
        app_data_dir = os.path.expanduser('~/Library/Application Support')
    else:
        app_data_dir = os.path.expanduser('~/.config')
    
    return os.path.join(app_data_dir, "basic-launcher")

def get_default_config():
    return {
        "disabled sources":[],
        
        "source settings": {
            "steam":{
                "path":None, # None means default path for the system
                "disabled games":["Steam Controller Configs"] # games that aren't shown
            }
        },

        "controller map": {
            "left": None,
            "right": None,
            "up": None,
            "down": None,
            "select": None,
        }
    }

def save_config():
    with open(os.path.join(get_app_data_directory(), "settings.json"), "w", encoding="utf-8") as f:
        json.dump(active_config, f)

def load_config():
    with open(os.path.join(get_app_data_directory(), "settings.json"), "r", encoding="utf-8") as f:
        return json.load(f)

def get_illustrations_path():
    return os.path.join(get_app_data_directory(), "illustrations")

if not os.path.exists(get_app_data_directory()):
    os.mkdir(get_app_data_directory())
    os.mkdir(get_illustrations_path())
    active_config = get_default_config()
    save_config()
    print(f"created {get_app_data_directory()}")
else:
    print(f"data dir {get_app_data_directory()}")
    active_config = load_config()
print(active_config)