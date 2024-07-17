class Source:
    name:str
    path:str
    disabled_games:list[str]
    def __init__(self, path, disabled_games) -> None:
        self.path = path
        self.disabled_games = disabled_games
    def get_games(self)->list[str]:
        raise NotImplemented(f"Source {self.name} not implemented")