from wordsegment import load, segment
from spellchecker import SpellChecker

spell = SpellChecker()

def word_segment(words):
    load()
    
    list_of_word = segment(words)

    segmented_list = []
    for word in list_of_word:

        corrected = spell.correction(word)
        candidate = spell.candidates(word)
        segmented_list.append(corrected)

    for word in segmented_list:
        if len(word) < 2 and word != 'a':
            segmented_list.remove(word)
    

    final_sentence = " ".join(segmented_list)
    
    print(final_sentence)

    return final_sentence


def main():
    words = "hhappyssunday"
    word_segment(words)

main()  
    
