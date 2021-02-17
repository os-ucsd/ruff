# Core Packages
import streamlit as st

import spacy 
import nltk
import random

nlp = spacy.load('en')
nltk.download('punkt')

# Page Configuration
st.set_page_config(page_title="Ruff", layout="wide")

QList = []
AList = []

def main():
	col1, col2 = st.beta_columns(2)
	col1.title("Ruff")
	col1.header("Flashcards made faster")
	col1.markdown("### Upload your notes either as text in the adjacent box or a pdf file below. We make the flashcards for you.")
	user_input = col2.text_area("Your Notes", height=150)

	if col2.button("Submit"):
		# Do Something with user_input
		generate_questions(user_input)
		
		st.markdown(user_input) #TODO: Only for Reference
	st.subheader("Upload Your Notes")
	pdf_file = st.file_uploader("",type=['pdf'])
	if st.button("Upload"):
		if pdf_file is not None:
			file_details = {"Filename":pdf_file.name,"FileType":pdf_file.type,"FileSize":pdf_file.size}
			st.write(file_details)

	st.markdown("## Your Flashcards:")

	index = -1
	#Proposed Stuff
	displayFlashCard()


	st.markdown("<br>", unsafe_allow_html=True)
	if st.button("Next"):
		#Iterate through flashcards
		key = "### This is the next question."


def displayFlashCard():
        index = -1
        if len(QList) == 0:
                key = "### This is a question."
        else:
                index=random.randint(0,len(QList))
                key = QList[index]
        st.markdown(key)
        with st.beta_expander("Answer:"):
                if index == -1:
                        st.markdown('#### This is the answer.')
                else:
                        st.markdown(AList[index])

        

def generate_questions(text):
        a_list = nltk.tokenize.sent_tokenize(text)
        for x in a_list:
                doc = nlp(x) 
  
                for ent in doc.ents: 

                    sample_sentence = x.replace(ent.text, "__________") + ". (Fill in the " + ent.label_ + ")"
                    QList.append(sample_sentence)
                    AList.append(ent.text)                    


if __name__ == '__main__':
		main()
