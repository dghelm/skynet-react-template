import { useState } from 'react';
import { Header, Container } from 'semantic-ui-react';
import PrizeList from '../components/PrizeList';
import PrizeForm from '../components/PrizeForm';

const prizeGiverUserID =
  '12ac371a9f55a83b49a19624d1ddd0e81d74d31f9e3aa63d2b89ed02652858af';

const Prizes = () => {
  const [userID, setUserID] = useState('');
  // const [wonPrizes, getPrizes, addPrize, removePrize] = usePrizes();

  return (
    <Container text style={{ marginTop: '7em' }}>
      <Header>Award Prizes to Users</Header>
      {/* This Component renders the items from our state. */}
      <PrizeList />
      {/* This Component renders a form to add items to our state. */}
      <PrizeForm auth={prizeGiverUserID} />
    </Container>
  );
};

export default Prizes;
