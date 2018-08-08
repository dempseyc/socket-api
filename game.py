import random

class Game(object):
    def __init__(self):
        self.board = [[None for _ in range(5)] for _ in range(5)]
        self.players = []
        self.game_on = False
        self.whos_turn = None
        self.deck1 = self.build_deck()
        self.deck2 = self.build_deck()
        self.decks = [self.deck1,self.deck2]
        print(self.decks)

    def reset(self):
        self.quit_game()
        self.__init__()
        message = self.create_message('game','game','game','reset')
        return message;

    def build_deck(self):
        cards = [1,1,1,1,1,1,1,1,1,1,1,1,2,2,3]
        random.shuffle(cards)
        return cards;

    def deal_cards(self,player):
        message = self.create_message('game', 'game', self.players[player-1], 'cards', self.decks[player-1])
        return message;

    def add_player(self,player):
        if (not self.game_on):
            self.players.append(player)
            if (len(self.players) > 1):
                self.start_game()
            return len(self.players)
        else:
            return self.reply_to_bad_joiner(player)

    def process_message(self,data):
        if (data.sender == self.whos_turn):
            self.do_logic(data)

    def create_message(self, tag, sender, receiver, text, board=None):
        message = {'tag': tag, 'sender': sender, 'receiver': receiver, 'text': text, 'board': board}
        return message;

    def do_logic(self, data):
        print(data['text'])

    def start_game(self):
        self.game_on = True
        self.whos_turn = self.players[0]
        text = 'game on'
        print(text)

    def quit_game(self):
        self.game_on = False
        text = 'game off'
        print(text)

    def reply_to_bad_joiner(self, player):
        message = self.create_message('direct', 'game', player, 'try later.', self.board)
        return message;



        