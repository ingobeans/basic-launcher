import config
from . import source
from . import game
from . import steam

def load_source(source_class):
    return source_class(config.active_config["source settings"][source_class.name]["path"], config.active_config["source settings"][source_class.name]["disabled games"])

source_steam = load_source(steam.Steam)

sources = [source_steam]

def get_games():
    games = []
    for s in sources:
        if not s.name in config.active_config["disabled sources"] and s.installed:
            for g in s.get_games():
                games.append(g)
    return games