def get_bot_response(user_input: str) -> str:
    if "hello" in user_input.lower():
        return "Hi there! How can I help you today?"
    elif "help" in user_input.lower():
        return "Sure, I'm here to assist you. What do you need help with?"
    else:
        return "I'm sorry, I didn't understand that. Could you please rephrase?"
