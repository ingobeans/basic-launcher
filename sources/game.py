from . import source

class Game:
    name:str
    parent_source:source.Source
    def __init__(self, name, parent_source) -> None:
        self.name = name
        self.parent_source = parent_source
    def __str__(self) -> str:
        return self.name
    def __repr__(self) -> str:
        return self.name