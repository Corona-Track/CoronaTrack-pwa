import React, { useEffect, useState } from 'react';
import { FiCopy, FiX } from 'react-icons/fi';
import {
  FaWhatsappSquare,
  FaFacebookSquare,
  FaTwitterSquare,
} from 'react-icons/fa';
import {
  Wrapper,
  Modal,
  Head,
  Title,
  Description,
  FieldCopy,
  ContainerSocialMedia,
  ContentSocialMedia,
} from './style';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

export default ({ active = false, onClose = () => {} }) => {
  let [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!active) {
      setCopied(false);
    }
  }, [active]);

  const shareUrl = 'http://www.coronatrack.com.br';
  const title = 'Olá, participe do CoronaTrack você também';

  async function handleCopied() {
    try {
      await navigator.clipboard.writeText('http://www.coronatrack.com.br');
      setCopied(true);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Wrapper active={active}>
      <Modal>
        <Head>
          <FiX onClick={onClose} style={{ fontSize: 20, color: '#03A39B' }} />
        </Head>
        <Title>Convide seus amigos</Title>
        <Description>
          Quanto mais pessoas contribuirem mais precisos serão os dados das
          zonas de risco
        </Description>
        <FieldCopy onClick={handleCopied}>
          http://www.coronatrack.com.br
          <FiCopy style={{ fontSize: 20, color: copied ? 'green' : 'black' }} />
        </FieldCopy>

        <ContainerSocialMedia>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <ContentSocialMedia color="#3b5998">
              <FaFacebookSquare />
            </ContentSocialMedia>
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <ContentSocialMedia color="#00ACEE">
              <FaTwitterSquare />
            </ContentSocialMedia>
          </TwitterShareButton>

          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <ContentSocialMedia color="#25d366">
              <FaWhatsappSquare />
            </ContentSocialMedia>
          </WhatsappShareButton>
        </ContainerSocialMedia>
      </Modal>
    </Wrapper>
  );
};
