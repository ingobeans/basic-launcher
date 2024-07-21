import platform, os, json

def get_system():
    return platform.system()

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
    with open("settings.json", "w", encoding="utf-8") as f:
        json.dump(active_config, f)

def load_config():
    with open("settings.json", "r", encoding="utf-8") as f:
        return json.load(f)
    
if not os.path.isfile("settings.json"):
    active_config = get_default_config()
    save_config()
    print(f"created settings.json")
else:
    print(f"loaded settings.json")
    active_config = load_config()
print(active_config)