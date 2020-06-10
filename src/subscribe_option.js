function subscribe_option(document, callback)
{
  const option =
    {
      document,

      updateQuery: (previous, { subscriptionData }) =>
      {
        if (!subscriptionData.data)
        {
          return previous;
        }

        return Object.assign({}, callback(previous, subscriptionData.data));
      }
    };

  return option;
}


export default subscribe_option;
