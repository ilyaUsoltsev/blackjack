#!/usr/bin/env python3
# -*- coding: utf-8 -*-

'''
creating array of cards
'''
l = ['c','d','h','s']
cards = []
for i in range(1,14):
    for letter in l:
        cards.append(letter+str(i))
    
print(cards)