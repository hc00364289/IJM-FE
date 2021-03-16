import React from 'react';
import { useSelector } from 'react-redux';

export const NotificationPopout = (props) => {
  return (
    <div
      style={{ minWidth: '390px', width: '390px', zIndex: '100', right: '4rem' }}
      className={`fr ${props.isPopoutFocus ? '' : 'dn'} mt2 br2 absolute shadow-2 ph4 pb3 bg-white`}
    >
      <span className="absolute top-0 left-2 nt2 w1 h1 bg-white bl ml7 bt b--grey-light rotate-45"></span>
      {/* <InboxNavMini
        newMsgCount={
          props.state &&
          props.state.notifications &&
          props.state.notifications.filter((n) => !n.read).length
        }
      />
      <NotificationResultsMini
        liveUnreadCount={props.liveUnreadCount}
        retryFn={props.forceUpdate}
        state={props.state}
        className="tl"
      />
      <InboxNavMiniBottom
        className="tl"
        setPopoutFocus={props.setPopoutFocus}
        msgCount={props.state && props.state.notifications && props.state.notifications.length}
      /> */}
    </div>
  );
};

export const NotificationsPage = (props) => {
  const initialData = {
    mapResults: {
      features: [],
      type: 'FeatureCollection',
    },
    results: [],
    pagination: { hasNext: false, hasPrev: false, page: 1 },
  };
  const userToken = useSelector((state) => state.auth.get('token'));
  //const [inboxQuery, setInboxQuery] = useInboxQueryParams();
  const [inboxQuery, setInboxQuery] = [];
  const [forceUpdated, forceUpdate] = [];
  const [state] = [];
  //const [state] = useInboxQueryAPI(initialData, inboxQuery, forceUpdated);

  if (!userToken) {
    // return <Login redirectTo={window.location.pathname} />;
    return;
  }
  // const [isPopoutFocus, setPopoutFocus] = useState(true);

  return (
    <>
      <div className="pt4-l pb5 ph5-l ph2 pt180 pull-center bg-tan">
        {
          props.children
          /* This is where the full notification body component is rendered
        using the router, as a child route.
        */
        }
        <section className="cf">
          {/* <InboxNav />
          <NotificationResults retryFn={forceUpdate} state={state} /> */}
          {/* <ProjectCardPaginator projectAPIstate={state} setQueryParam={setInboxQuery} /> */}

          {/* delete me! TDK */}
          <code className={`dn`}>{JSON.stringify(state)}</code>
        </section>
      </div>
    </>
  );
};

export const NotificationPageIndex = (props) => {
  return null;
};

export const NotificationDetail = (props) => {
  const [thisNotificationError, thisNotificationLoading, thisNotification] = [];

  /* Inside, this loads a NotificationBodyCard */
  return <div> </div>;
};
