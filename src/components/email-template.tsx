import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { render } from '@react-email/render';


interface EmailTemplate {
  message?: string;
  name?: string;
  email?: string;
  updatedDate?: Date;
}

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : '';

export const EmailTemplate = ({
  message,
  email,
  name,
}: EmailTemplate) => {

  return (
    <Html>
      <Head />
      <Preview>Perfumy Contact Message</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>
            <Text style={paragraph}>New Contact Message from {name}</Text>
            <Text style={paragraph}>
              {message}
            </Text>
            <Text style={paragraph}>
              email: {email}
            </Text>
          </Section>
        </Container>
        <Section style={footer}>
          <Text style={{ textAlign: 'center', color: '#706a7b' }}>
            © 2022 Perfumy, All Rights Reserved
          </Text>
        </Section>
      </Body>
    </Html>
  );
};


export const get_html_template = (name: string, email: string, message: string) => render(<EmailTemplate name={name} email={email} message={message} />, {
  pretty: true,
});

export default EmailTemplate;

const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

const main = {
  backgroundColor: '#efeef1',
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  width: '580px',
  margin: '30px auto',
  backgroundColor: '#ffffff',
};

const footer = {
  width: '580px',
  margin: '0 auto',
};

const content = {
  padding: '5px 50px 10px 60px',
};