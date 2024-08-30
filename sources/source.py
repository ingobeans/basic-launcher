import config

class Source:
    name:str
    path:str
    disabled_games:list[str]
    installed:bool = True
    def __init__(self) -> None:
        self.path = config.active_config["source settings"][self.name]["path"]
        self.disabled_games = config.active_config["source settings"][self.name]["disabled games"]
    def get_games(self)->list[str]:
        raise NotImplemented(f"Source {self.name} not implemented")
    def get_disabled_games(self):
        return config.active_config["source settings"][self.name]["disabled games"]