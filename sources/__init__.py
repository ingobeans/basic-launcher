import config
from . import source
from . import game
from . import steam
from . import raw

source_steam = steam.Steam()
source_raw = raw.Raw()

sources:list[source.Source] = [source_steam,source_raw]

def get_games():
    games = []
    for s in sources:
        if not s.name in config.active_config["disabled sources"] and s.installed:
            illustration_overrides = s.get_illustration_overrides()
            for g in s.get_games():
                if not g.name in s.get_disabled_games():
                    if g.name in illustration_overrides:
                        g.illustration_path = illustration_overrides[g.name]
                    games.append(g)
    return games