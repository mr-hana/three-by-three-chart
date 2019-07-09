import React from 'react';
import NewKeyword from '../components/NewKeyword';

const NewPage = props => {
  const navigateIndex = () => props.history.push('/');
  return (
    <NewKeyword navigateNext={navigateIndex} />
  );
}

export default NewPage;