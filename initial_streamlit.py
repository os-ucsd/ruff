# Core Packages
import streamlit as st
import streamlit.components.v1 as components

_my_component=components.declare_component(
	"my_component"
	url="http://localhost:3001"
)
_my_component(data="hi")
# Page Configuration
st.set_page_config(page_title="Ruff", layout="wide")

def main():
	col1, col2 = st.beta_columns(2)
	col1.title("Ruff")
	col1.header("Flashcards made faster")
	col1.markdown("### Upload your notes either as text in the adjacent box or a pdf file below. We make the flashcards for you.")
	user_input = col2.text_area("Your Notes", height=150)
	if col2.button("Submit"):
		# Do Something with user_input
		st.markdown(user_input) #TODO: Only for Reference
	st.subheader("Upload Your Notes")
	pdf_file = st.file_uploader("",type=['pdf'])
	if st.button("Upload"):
		if pdf_file is not None:
			file_details = {"Filename":pdf_file.name,"FileType":pdf_file.type,"FileSize":pdf_file.size}
			st.write(file_details)

	st.markdown("## Your Flashcards:")

	#Proposed Stuff
	key = "### This is a question."
	st.markdown(key)
	with st.beta_expander("Answer:"):
		st.markdown('#### This is the answer.')
	st.markdown("<br>", unsafe_allow_html=True)
	if st.button("Next"):
		#Iterate through flashcards
		key = "### This is the next question."


if __name__ == '__main__':
		main()
