import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration, OpenAIApi } from 'openai';
import { IonContent } from '@ionic/angular';

export class Message {
    from: string | undefined;
    text: string | undefined;
    created: Date | undefined;
}

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.page.html',
    styleUrls: ['chat.page.scss']
})
export class ChatPage {
    @ViewChild(IonContent) content: IonContent | undefined;

    private openai: OpenAIApi;

    public messages: Message[] = []

    constructor(
        private router: Router
    ) {

        // Show initial message
        const msg = new Message();

        msg.created = new Date();
        msg.from = "chatgpt";
        msg.text = "How can I help you?";

        this.messages.push(msg);

        // setup openai
        this.openai = new OpenAIApi(new Configuration({
            apiKey: "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",
        }));
    }
    public sendMessage(prompt: any) {
        const question = prompt.target.value

        // Add my message to the message list
        const msg = new Message();

        msg.created = new Date();
        msg.from = "me";
        msg.text = question;

        this.messages.push(msg);

        prompt.target.value = "";

        setTimeout(() => {
            // @ts-ignore
            this.content.scrollToBottom(1);
        }, 200);

        // Send question to chatGPT
        this.openai.createCompletion({
            model: "text-davinci-003",
            prompt: question,
            max_tokens: 256
        }).then(response => {
            const msg = new Message();
            msg.created = new Date();
            msg.from = "chatgpt";
            msg.text = response.data.choices[0].text;
            this.messages.push(msg);
            setTimeout(() => {
                // @ts-ignore
                this.content.scrollToBottom(1);
            }, 200);
        }).catch(error=>{
            const msg = new Message();
            msg.created = new Date();
            msg.from = "chatgpt";
            msg.text = "I'm sorry I'm having a hard time answering that question at the moment.";
            this.messages.push(msg);
            console.log(error);
        });
    }
}
