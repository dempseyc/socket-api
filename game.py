class Game(object):
    def __init__(self):
        self.board = [[None for _ in range(5)] for _ in range(5)]
        self.players = set()
        self.game_on = False
        self.whos_turn = None

    def add_player(self,player):
        if (not self.game_on):
            self.players.add(player)
            if (len(self.players) > 1):
                self.start_game()
        else:
            self.reply_to_bad_joiner(player)

    def process_message(self,data):
        if (data.sender == self.whos_turn):
            self.do_logic(data)

    def create_message(self, tag, sender, receiver, text):
        message = {'tag': tag, 'sender': sender, 'receiver': receiver, 'text': text}
        return message;

    def do_logic(self, data):
        print(data['text'])

    def start_game(self):
        self.game_on = True
        text = 'game_on'
        print(text)

    def reply_to_bad_joiner(self, player):
        message = self.create_message('game', 'game', player, 'try later.')
        self.send_message(message)

    def send_message(self, message):
        print(message)


        