/**
 * NDE Q&A Chat Functionality
 * Manages the chat interface and AI interactions
 */

class NDEChatApp {
    constructor() {
        // Initialize state
        this.chatHistory = [];
        this.isProcessing = false;
        this.apiKey = null; // Add your API key here for testing, but use env variables for production

        // Chat elements
        this.chatContainer = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-button');
        
        // Initialize
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Handle language changes
        document.addEventListener('languageChanged', (e) => {
            this.updatePlaceholder(e.detail.language);
        });
        
        // Focus input field
        setTimeout(() => {
            this.userInput.focus();
        }, 1000);
    }
    
    updatePlaceholder(language) {
        // Update placeholder text for the current language
        if (translations[language] && translations[language]['input-placeholder']) {
            this.userInput.placeholder = translations[language]['input-placeholder'];
        }
    }
    
    sendMessage() {
        const message = this.userInput.value.trim();
        if (message === '' || this.isProcessing) return;
        
        // Add user message to chat
        this.addMessageToChat('user', message);
        
        // Clear input
        this.userInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process with AI
        this.processWithAI(message);
    }
    
    addMessageToChat(role, content) {
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(role === 'user' ? 'user-message' : 'assistant-message');
        
        // Add message content
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = content;
        messageDiv.appendChild(messageParagraph);
        
        // Add to chat container
        this.chatContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
        
        // Add to chat history
        this.chatHistory.push({ role, content });
    }
    
    showTypingIndicator() {
        // Create typing indicator
        this.isProcessing = true;
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        typingDiv.id = 'typing-indicator';
        this.chatContainer.appendChild(typingDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        // Remove typing indicator
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isProcessing = false;
    }
    
    scrollToBottom() {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
    
    async processWithAI(userMessage) {
        try {
            // Prepare messages in format for OpenAI API
            const messages = this.formatMessagesForAPI();
            
            // In a real implementation, you would call the OpenAI API here
            // For this demo, we'll simulate a response
            setTimeout(() => {
                this.removeTypingIndicator();
                
                // Get AI response (in a real app, this would come from the API)
                const aiResponse = this.simulateAIResponse(userMessage);
                
                // Add AI response to chat
                this.addMessageToChat('assistant', aiResponse);
            }, 1500);
            
            // Example of how to call OpenAI API (commented out for demo)
            /*
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',  // or another appropriate model
                    messages: messages,
                    max_tokens: 500,
                    temperature: 0.7
                })
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            
            // Remove typing indicator and add AI response
            this.removeTypingIndicator();
            this.addMessageToChat('assistant', aiResponse);
            */
        } catch (error) {
            console.error('Error processing with AI:', error);
            this.removeTypingIndicator();
            this.addMessageToChat('assistant', 'I apologize, but I encountered an error processing your request. Please try again later.');
        }
    }
    
    formatMessagesForAPI() {
        // Format chat history for API call
        const systemPrompt = {
            role: 'system',
            content: 'You are an AI assistant specializing in near-death experiences (NDEs), consciousness research, and related spiritual and scientific topics. Provide evidence-based, balanced responses that acknowledge both scientific research and personal experiences. Avoid religious dogma but respect spiritual dimensions. Be conversational, thoughtful, and nuanced in your responses.'
        };
        
        const formattedMessages = [systemPrompt];
        
        // Add chat history
        this.chatHistory.forEach(message => {
            formattedMessages.push({
                role: message.role,
                content: message.content
            });
        });
        
        return formattedMessages;
    }
    
    simulateAIResponse(userMessage) {
        // This is a placeholder function for demonstration purposes
        // In a real implementation, responses would come from the OpenAI API
        
        const lowercaseMessage = userMessage.toLowerCase();
        
        if (lowercaseMessage.includes('what is') && lowercaseMessage.includes('nde')) {
            return "A near-death experience (NDE) is a profound psychological event that occurs when a person is close to death or in a situation of physical or emotional crisis. NDEs are characterized by specific elements such as feelings of peace, seeing a bright light, encountering deceased relatives, life review, and sometimes an out-of-body experience where people report floating above their physical body. These experiences have been reported across cultures and throughout history, and recent scientific research has focused on understanding the neurological and psychological mechanisms behind them.";
        } 
        else if (lowercaseMessage.includes('consciousness') || lowercaseMessage.includes('afterlife')) {
            return "NDEs raise fascinating questions about consciousness and the possibility of existence beyond physical death. Many experiencers report heightened awareness and lucid thinking even when their brain activity was minimal or absent, challenging conventional neuroscientific models that view consciousness as solely produced by the brain. While some researchers propose that NDEs are hallucinations caused by a dying brain, others suggest they might indicate that consciousness can exist independently of physical brain function. This remains one of the most significant scientific questions in NDE research, with implications for our understanding of consciousness, reality, and human existence.";
        }
        else if (lowercaseMessage.includes('evidence') || lowercaseMessage.includes('research') || lowercaseMessage.includes('scientific')) {
            return "Scientific research on NDEs has grown significantly in recent decades. Studies like the AWARE (AWAreness during REsuscitation) project have examined reports from cardiac arrest survivors, including cases where patients accurately described events during their resuscitation when they were clinically dead. Other research focuses on commonalities in NDE accounts across cultures, the lasting psychological effects on experiencers, and the neurological mechanisms potentially involved. While no single theory fully explains all aspects of NDEs, the evidence suggests they are not simply hallucinations or oxygen deprivation, as they often occur in patients with normal brain oxygen levels and include verifiable perceptions. The field continues to evolve with interdisciplinary approaches from neuroscience, psychology, philosophy, and consciousness studies.";
        }
        else {
            return "That's a fascinating question about near-death experiences. Many people who have had NDEs report profound shifts in their values and outlook on life, often becoming less materialistic and more compassionate. They frequently lose their fear of death and develop a stronger sense of purpose. The consistency of these transformations across different cultures and backgrounds suggests that NDEs have a genuine and profound impact on human consciousness, regardless of how we ultimately explain their origin. Would you like to explore any particular aspect of this phenomenon in more detail?";
        }
    }
}

// Initialize chat application after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ndeChat = new NDEChatApp();
}); 