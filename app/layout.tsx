'use client';

import '../styles/globals.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../package.json';
import ReactQueryWrapper from './ReactQueryWrapper';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
});

// export const metadata : Metadata = {
//   title: config.name,
//   description: config.description,
//   icons: [
//     {
//       rel: 'icon',
//       url: '/favicon.ico',
//       sizes: '32x32',
//       type: 'image/x-icon',
//     },
//   ],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="d-flex flex-grow-1 vh-100 smooth-scroll">
        <ReactQueryWrapper>
          {children}
          <ToastContainer />
        </ReactQueryWrapper>
      </body>
      <Script
        id="datadog-rum"
        dangerouslySetInnerHTML={{
          __html: `
          (function(h,o,u,n,d) {
            h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
            d=o.createElement(u);d.async=1;d.src=n
            n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
          })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
          DD_RUM.onReady(function() {
            DD_RUM.init({
              clientToken: 'pub85319826237c544f2bd7f9a25e31f448',
              applicationId: 'dfe9919f-435e-4edf-a3fc-2b4cfaaea324',
              site: 'datadoghq.com',
              service: 'vqa',
              env: '${process.env.NODE_ENV}',
              // Specify a version number to identify the deployed version of your application in Datadog
              version: '${config.version}',
              sampleRate: 100,
              sessionReplaySampleRate: 20,
              trackInteractions: true,
              trackResources: true,
              trackLongTasks: true,
              defaultPrivacyLevel: 'mask-user-input',
            });

            DD_RUM.startSessionReplayRecording();
          })
          `,
        }}
        strategy="afterInteractive"
      />
    </html>
  );
}
