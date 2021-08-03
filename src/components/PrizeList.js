import { Checkbox, List, Button, Loader, Header } from 'semantic-ui-react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const PrizeList = () => {
  const { loading, prizeItems, userID } = useStoreState(
    (state) => state.prizes
  );
  const { updatePrize, deletePrize } = useStoreActions(
    (actions) => actions.prizes
  );

  return (
    <>
      {userID && (
        <div>
          <Header as="h3">
            Prizes awarded to:
            <br />
            {userID}
          </Header>
          <List divided relaxed>
            {prizeItems.map((prize, i) => (
              <List.Item key={i}>
                <Checkbox
                  onClick={(e, elem) => {
                    updatePrize({ elem, i });
                  }}
                  checked={prize.sent}
                  label={prize.prize}
                />
                <Button
                  compact
                  basic
                  color="red"
                  icon="delete"
                  floated="right"
                  onClick={(e, elem) => {
                    deletePrize({ elem, i });
                  }}
                />
              </List.Item>
            ))}
          </List>
        </div>
      )}
    </>
  );
};

export default PrizeList;
