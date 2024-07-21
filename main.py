import eel, sources, shutil, os, config, base64
eel.init('web')

games = []

def game_to_dict(game):
    return {"name":game.name, "source":game.parent_source.name, "id":game.id, "illustration": game.illustration_path != None}

@eel.expose
def get_illustration_data(game_id):
    game = [g for g in games if g.id == str(game_id)][0]
    path = game.illustration_path
    if os.path.isfile(path):
        with open(path, "rb") as f:
            data = f.read()
    else:
        return None
    
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
    return [game_to_dict(g) for g in games]

eel.start('hello.html', port=5048)
