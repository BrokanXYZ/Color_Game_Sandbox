import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>

      <CssBaseline />

      <main>
        <Container maxWidth="lg" style={{marginTop: '65px'}}>
          {children}
        </Container>
      </main>
    </>
  )
}