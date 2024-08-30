import config
from . import source
from . import game
from . import steam
from . import raw

source_steam = steam.Steam()
source_raw = raw.Raw()

sources = [source_steam,source_raw]

def get_games():
    games = []
    for s in sources:
        if not s.name in config.active_config["disabled sources"] and s.installed:
            for g in s.get_games():
                games.append(g)
    return games