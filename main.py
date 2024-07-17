import eel, sources
eel.init('web')

@eel.expose
def get_games():
    games = sources.get_games()
    # convert games to dicts
    return [{"name":g.name, "source":g.parent_source.name} for g in games]

eel.start('hello.html', port=5000)
