import random

class Game(object):
    def __init__(self):
        self.board = [[None for _ in range(5)] for _ in range(5)]
        self.players = []
        self.game_on = False
        self.whos_turn = None
        self.deck1 = self.__build_deck()
        self.deck2 = self.__build_deck()
        self.decks = [self.deck1,self.deck2]
        self.phase = 'init'

    def reset(self):
        self.quit_game()
        self.__init__()
        message = self.create_message('game','game','game','reset')
        return message;

    def __build_deck(self):
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

    def process_message(self,message):
        if (message['sender'] == self.whos_turn):
            return self.apply_move(message)
            # print('pm')

    def create_message(self, tag, sender, receiver, text, data=None):
        message = {'tag': tag, 'sender': sender, 'receiver': receiver, 'text': text, 'data': data}
        return message;

    def apply_move(self, message):
        player = message['data'][0]
        card_val = message['data'][1]
        square = message['data'][2]
        self.board[int(square[0])][int(square[1])] = str(player)+'-'+str(card_val)
        if (self.whos_turn == self.players[0]):
            self.whos_turn = self.players[1]
        else:
            self.whos_turn = self.players[0]
        return self.create_message('game','game','game','board',self.board)

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
        message = self.create_message('direct', 'game', player, 'try later.')
        return message;



        