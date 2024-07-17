from . import source

class Steam(source.Source):
    name:str = "steam"
    def get_games(self):
        return ["Team Fortress 2", "Celeste", "Terraria"]