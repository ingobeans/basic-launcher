import eel, sources, shutil, os
eel.init('web')

loaded_illustrations_path = os.path.join("web","illustrations")
loaded_illustrations = os.listdir(loaded_illustrations_path)

def load_illustrations(games):
    # create local web accesible copy of all game illustrations

    for game in games:
        if not game.illustration_path:
            continue
        
        filename = f"{game.id}.jpg"
        if not filename in loaded_illustrations:
            shutil.copy(game.illustration_path, os.path.join(loaded_illustrations_path, filename))

def game_to_dict(game):
    return {"name":game.name, "source":game.parent_source.name, "id":game.id, "illustration":(f"illustrations/{game.id}.jpg" if game.illustration_path else None)}

@eel.expose
def get_games():
    games = sources.get_games()
    load_illustrations(games)
    return [game_to_dict(g) for g in games]

eel.start('hello.html', port=5000)
