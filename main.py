import eel, sources, shutil, os, config, base64
eel.init('web')

games = []

loaded_illustrations = os.listdir(config.get_illustrations_path())

def load_illustrations(games):
    # create local web accesible copy of all game illustrations

    for game in games:
        if not game.illustration_path:
            continue
        
        filename = f"{game.id}.jpg"
        if not filename in loaded_illustrations:
            shutil.copy(game.illustration_path, os.path.join(config.get_illustrations_path(), filename))

def game_to_dict(game):
    return {"name":game.name, "source":game.parent_source.name, "id":game.id, "illustration":(f"illustrations/{game.id}.jpg" if game.illustration_path else None)}

@eel.expose
def get_illustration_data(game_id):
    path = os.path.join(config.get_illustrations_path(), f"{game_id}.jpg")
    if os.path.isfile(path):
        with open(path, "rb") as f:
            data = f.read()
    
    base64_data = base64.b64encode(data).decode('utf-8')
    return f"data:image/jpeg;base64,{base64_data}"

@eel.expose
def get_controller_map():
    return config.active_config["controller map"]

@eel.expose
def run_game(id):
    print(id)
    game = [g for g in games if g.id == str(id)][0]
    game.parent_source.run_game(id)

@eel.expose
def get_games():
    global games
    games = sources.get_games()
    load_illustrations(games)
    return [game_to_dict(g) for g in games]

eel.start('hello.html', port=5048)
