document.addEventListener('DOMContentLoaded', function () {
    const chatLog = document.getElementById('chat-log');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const userchat = document.querySelector('.user');
    const responsechat = document.querySelector('.response');
    const questionButtons = document.querySelectorAll('.question');

    questionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const question = button.textContent;
            const answer = getAnswerForQuestion(question);
            addMessage(question, 'user');
            addMessage(answer, 'response');
            addSpace();
          

        });
    });

    sendButton.addEventListener('click', function () {
        const message = messageInput.value;
        if (message.trim() !== '') {
            addMessage(message, 'user');
            const answer = provideAutomaticResponse(message);
            addMessage(answer, 'response');
            addSpace();
            messageInput.value = '';
            chatLog.scrollTop = chatLog.scrollHeight;
        }
    });

    function provideAutomaticResponse(question) {
        const normalizedQuestion = question.toLowerCase(); // Convert the question to lowercase for easier comparison
    
        // Example: Checking for specific keywords in the question to generate relevant responses
        if (normalizedQuestion.includes('weather')) {
            return "The weather is quite nice today!";
        } else if (normalizedQuestion.includes('help')) {
            return "Sure, how can I assist you?";
        } else if(normalizedQuestion.includes('qualification')){
            return "qualification doesint matter if you are skilled, anyway I have completed b.com ca.";
        } else if (normalizedQuestion.includes('age')) {
            return "22 year old";
        }
        else {
            return "if you want more information contact me on instagram.";
        }
    }

    function getAnswerForQuestion(question) {
        // Your predefined answers for specific questions
        const answers = {
            "Where are you live now": "I'm live in palakkad in kerala",
            "I 'd like to hire you": "Oh great, contact me.. I am happy hear from you ",
            " interested in membership": "Planning to establish a community in the future; please keep this message as I will be in touch.",
            " what is your name": "my name rafi",


        };
        return answers[question] || "I'm sorry, I don't have an answer for that.";
    }

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatLog.appendChild(messageElement);
    }
    function addSpace() {
        const spaceElement = document.createElement('div');
        spaceElement.classList.add('message', 'space');
        chatLog.appendChild(spaceElement);
    }
});


