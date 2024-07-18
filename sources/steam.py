import config, os, vdf
from . import source
from . import game

class Steam(source.Source):
    name:str = "steam"

    def valid_path(self, path):
        valid = os.path.isdir(path) and os.path.isdir(os.path.join(path, "steamapps"))
        return valid
    
    def game_exists(self, name):
        path = self.get_path()
        if not path:
            return []
        
        apps = os.path.join(path, "steamapps", "common")
        return name in os.listdir(apps)

    def get_default_path(self):
        system = config.get_system()
        if system == "Windows":
            return os.path.join(os.environ.get("ProgramFiles(x86)", "C:\\Program Files (x86)"),"Steam")
        elif system == "Darwin":
            return os.path.expanduser('~/Library/Application Support/Steam')
        else:
            old_path = os.path.expanduser('~/.local/share/Steam')
            if os.path.exists(old_path):
                return old_path
            return os.path.expanduser('~/.steam/steam')
    
    def get_path(self):
        path = None
        if self.path:
            path = self.path
        else:
            path = self.get_default_path()
        
        if not self.valid_path(path):
            self.installed = False
            return None
        
        return path

    def get_games(self):
        path = self.get_path()
        if not path:
            return []
        
        apps_path = os.path.join(path, "steamapps")
        games = []

        # load all steam app manifests
        files = os.listdir(apps_path)
        filtered_files = [x for x in files if x.startswith("appmanifest_")]
        
        for manifest in filtered_files:
            # load the (vdf formatted) manifests 
            with open(os.path.join(apps_path, manifest), "r", encoding="utf-8") as f:
                data = vdf.load(f)["AppState"]
            games.append(game.Game(self, data["name"], data["appid"]))
        return games