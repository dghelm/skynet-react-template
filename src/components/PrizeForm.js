import { Input, Button } from 'semantic-ui-react';
import { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

function PrizeForm({ auth }) {
  const { getUserPrizes, addPrize } = useStoreActions(
    (actions) => actions.prizes
  );
  const { userID } = useStoreState((state) => state.prizes);
  const { userID: mySkyID } = useStoreState((state) => state.mySky);
  const [userIDForm, setUserIDForm] = useState('');
  const [prize, setPrize] = useState('');

  return (
    <>
      <div>
        <Input
          placeholder="UserID"
          onChange={(e) => setUserIDForm(e.target.value)}
          value={userIDForm}
        />
        <Button
          onClick={() => getUserPrizes({ userID: userIDForm })}
          style={{ marginLeft: '10px' }}
        >
          Get User Prizes
        </Button>
      </div>
      {mySkyID === auth && (
        <div>
          <Input
            placeholder="Prize..."
            onChange={(e) => setPrize(e.target.value)}
            value={prize}
          />
          <Button
            onClick={() => addPrize({ prize, description: '' })}
            style={{ marginLeft: '10px' }}
            disabled={userID !== userIDForm}
          >
            Award Prize
          </Button>
        </div>
      )}
    </>
  );
}

export default PrizeForm;
