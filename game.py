import random

class Game(object):
    def __init__(self):
        self.board = [['0' for _ in range(5)] for _ in range(5)]
        self.players = []
        self.game_on = False
        self.whos_turn = None
        self.deck1 = self.__build_deck()
        self.deck2 = self.__build_deck()
        self.decks = [self.deck1,self.deck2]
        self.phase = 'init'
        self.bombs_on_board = []
        self.bomb_disabled = False
        self.win_states = self.make_win_states()
        self.winner = [False,'0']
        # self.starter_board =
        # [["2", "0", "1", "0", "1"],
        # ["0", "0", "0", "0", "0"],
        # ["1", "0", "1", "0", "2"],
        # ["0", "0", "0", "0", "0"],
        # ["2", "0", "2", "0", "1"]]
        # player 2s turn

    def reset(self):
        self.quit_game()
        self.__init__()
        message = self.create_message('game','game','game','reset')
        return message;

    def __build_deck(self):
        cards = [1,1,1,1,1,1,1,1,1,1,1,1,2,2,3]
        random.shuffle(cards)
        return cards;

    def deal_3(self,player):
        message = self.create_message('game', 'game', self.players[player-1], 'cards', self.decks[player-1][:3:])
        del self.decks[player-1][:3:]
        return message;

    def deal_1(self,player):
        message = self.create_message('game', 'game', self.players[player-1], 'cards', self.decks[player-1][:1:])
        del self.decks[player-1][:1:]
        return message;

    def return_cards(self,cards):
        for c in cards:
            owner = int(c.split('-')[0])
            val = c.split('-')[1]
            self.decks[owner-1].append(val)

    def add_player(self,player):
        if (not self.game_on):
            self.players.append(player)
            if (len(self.players) > 1):
                self.start_game()
            return len(self.players)
        else:
            return self.reply_to_bad_joiner(player)

    def create_message(self, tag, sender, receiver, text, data=None):
        message = {'tag': tag, 'sender': sender, 'receiver': receiver, 'text': text, 'data': data}
        return message;

    def process_message(self, message):
        print(message)

        player = message['data'][0]
        card_val = message['data'][1]
        square = message['data'][2]
        self.bomb_disabled = False

        if len(message['data']) > 3:
            tha_bomb = message['data'][3]
            tha_bomb = self.bombs_on_board[0]
            cards_to_return = self.explode_bomb(player,tha_bomb)
            print(cards_to_return, "return")
            # put a 1 card in place of bomb
            card_val = 1
            square = [tha_bomb[0],tha_bomb[1]]
            # delete a 1 card from deck

        elif card_val == str(2):
            existing_card = self.board[int(square[0])][int(square[1])]
            if (existing_card != '0'):
                print('existing',existing_card)
                owner = existing_card.split('-')[0]
                val = existing_card.split('-')[1]
                if (val == str(3)):
                    self.bomb_disabled = self.disable_bomb(owner)
                self.return_cards([existing_card])

        elif card_val == str(3):
            self.load_bomb(square[0],square[1],player)
        self.board[int(square[0])][int(square[1])] = str(player)+'-'+str(card_val)
        text = 'board'
        if (self.bomb_disabled):
            text = 'disable'
        return self.create_message('game','game','game',text,self.strip_private_info(self.board))

    def strip_private_info(self,board_data):
        public_board = [[s[0] for s in row] for row in board_data]
        return public_board;

    def load_bomb(self,cy,cx,player_num):
        self.bombs_on_board.append([cy,cx,player_num])
        print(self.bombs_on_board, 'bombs')

    def disable_bomb(self,player_num):
        self.bombs_on_board.pop(0)
        return True;

    def explode_bomb(self,player,bomb):
        square = [bomb[0],bomb[1]]
        del self.bombs_on_board[0]
        cards_returned = self.bombBoard(square)
        for c in cards_returned:
            owner = int(c.split('-')[0])
            val = c.split('-')[1]
            if val == str(3):
                self.bomb_disabled = self.disable_bomb(owner)
        return cards_returned;

    def bombBoard(self,b):
        cards_removed = []
        for i,row in enumerate(self.board):
            for j,s in enumerate(row):
                if (self.is_adjacent([i,j],b) and self.board[i][j] != '0'):
                    cards_removed.append(self.board[i][j])
                    self.board[i][j] = '0'
        return cards_removed;

    def is_adjacent(self,s,b):
        ss = [int(s[0]),int(s[1])]
        adjacent = self.get_adjacent(b)
        if ss in adjacent:
            return True;

    def get_adjacent(self,square):
        limit = len(self.board)
        x = int(square[0])
        y = int(square[1])
        h = [x+1,x,x-1]
        v = [y+1,y,y-1]
        adj = [[a,b] for a in h for b in v if a in range(limit) if b in range(limit) if [a,b] != [x,y]]
        return adj;

    def switch_turn(self):
        if (self.whos_turn == self.players[0]):
            self.whos_turn = self.players[1]
        else:
            self.whos_turn = self.players[0]

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

    def make_win_states(self):
        hs = [[str(x)+str(y) for y in range(5)] for x in range(5)]
        vs = [[str(x)+str(y) for x in range(5)] for y in range(5)]
        diag1 = [str(x)*2 for x in range(5)]
        diag2 = ['40','31','22','13','04']
        combos = hs+vs+[diag1]+[diag2]
        return combos;

    # wrote this with no bugs on first try, wow!
    def check_board_for_combo(self,combo):
        coos = [[int(s[0]),int(s[1])] for s in combo]
        board_vals = [ self.board[coo[0]][coo[1] ] for coo in coos]
        result = True
        player = '0'
        prev = board_vals[-1][0]
        for i,val in enumerate(board_vals):
            if (val[0] == prev and val[0] != '0'):
                prev = board_vals[i][0]
                player = val[0]
                continue;
            else:
                result = False
        return [result, player]
        

    def check_win_state(self):
        win = [False,'0']
        if ( len(self.bombs_on_board) < 1 ):
            for win_combo in self.win_states:
                win = self.check_board_for_combo(win_combo)
                if(win[0]):
                    return win;
                else:
                    continue;
        return win;

    def create_win_message(self,player):
        winner = self.players[int(player)-1]
        data = f'{winner} wins!!'
        return self.create_message('game','game','game','win',data)