import React, { Fragment, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../store';
import Advertisement from '../dashboard/Advertisement';
import { getAllUsers, loadUser } from '../../actions/auth';
import {
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
  cancelFriendRequest,
  getPendingFrUser,
  getFriendSuggestion
} from '../../actions/friends';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
const IMAGEURL = process.env.REACT_APP_CLOUDINARY;

const AddFriendList = ({
  auth: { allUsers, user },
  friend: {pendingFriend, friendSuggestion, loadingFriend},
  getAllUsers,
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
  cancelFriendRequest,
  getPendingFrUser,
  getFriendSuggestion,
  loadUser,
}) => {
  const [isSendRequest, setIsSendRequest] = useState(false);
  // const dispatch = useDispatch()
  // const [friendSuggestionList, setFriendSuggestionList] = useState([])
  const [loadFriend, setLoadFriend] = useState(loadingFriend);
  useEffect(() => {
    console.log('calling useEffect of AddFriendList');
    loadUser();
    getPendingFrUser();
    setIsSendRequest(isSendRequest);
    //getFriends();
    getFriendSuggestion();
    setTimeout(() => {
      setLoadFriend(false) 
    }, 2000);
    
  }, [getAllUsers, loadUser, isSendRequest, getPendingFrUser]);
  //const [pendingFriend, setPendingFriend] = useState([]);
  //const [addFriendList, setAddFriendList] = useState([]);
  // const [isSetPenFr, setIsSetPenFr] = useState(true);
  
//   const getFriends = async () => {
//     let userInfo = []

//     dispatch(getFriendSuggestion((res, err) => {
//         if (res?.data?.data) {
//             setLoadFriend(false)
//             userInfo = JSON.parse(res.data.data)
//             console.log('Friend suggestion in callback ',userInfo);
//         }
//     }))
//     setFriendSuggestionList(userInfo || [])
// }
  const addFriendRequest = (id) => {
    sendFriendRequest(id);
    setIsSendRequest(!isSendRequest);
    setLoadFriend(true);
    // setTimeout(() => {
    //   setLoadFriend(false) 
    // }, 2000);
    //window.location.replace('/friends');
  };
  const cancelFrRequest = (id) => {
    cancelFriendRequest(id);
    setIsSendRequest(!isSendRequest);
    setLoadFriend(true);
    // setTimeout(() => {
    //   setLoadFriend(false) 
    // }, 2000);
    //window.location.reload(false);
    //window.location.replace('/friends');
  };
  const deleteFrRequest = (id) => {
    deleteFriendRequest(id);
    setIsSendRequest(!isSendRequest);
    setLoadFriend(true);
    //window.location.replace('/friends');
  };
  const acceptFrRequest = (id) => {
    acceptFriendRequest(id);
    setIsSendRequest(!isSendRequest);
    setLoadFriend(true);
    //window.location.replace('/friends');
  };
  console.log('user friends loading', loadFriend);
  //console.log('Suggestion Friend', friendSuggestion);
  //console.log(suggestedFriend);

  return loadFriend ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container-fluid'>
        <div
          className='d-sm-flex align-items-center 
                            justify-content-between mb-4'
        >
          <h1 className='h3 mb-0 text-gray-800'>Friends</h1>
        </div>
        <div className='row'>
          <div className='col-sm-12 col-md-6 col-lg-9'>
            <div className='card shadow mb-4'>
              <div className='card-header py-3'>
                <h6 className='m-0 font-weight-bold text-primary'>
                  Friend Requests
                </h6>
              </div>
              {pendingFriend.length > 0
                ? pendingFriend.map((pendingFr) => (
                    <div
                      key={pendingFr._id.$oid}
                      id='posts-list'
                      className='card-body friendCard'
                    >
                      <div className='post-card card'>
                        <div className='row'>
                          <div className='col-sm-12 col-md-12 col-lg-4'>
                            <img
                              src={IMAGEURL+pendingFr.image}
                              alt={pendingFr.name}
                              className='friendImageProfile'
                            />
                          </div>
                          <div className='col-sm-12 col-md-12 col-lg-8'>
                            <Link
                              to={{
                                pathname: '/profile',
                                state: {
                                  id: pendingFr._id.$oid,
                                },
                              }}
                            >
                              <h4>{pendingFr.name}</h4>
                            </Link>

                            <Link
                              to='/friends'
                              onClick={() =>
                                acceptFrRequest(pendingFr._id.$oid)
                              }
                              className='btn btn-primary'
                              style={{ marginRight: 5 }}
                            >
                              Accept Request
                            </Link>
                            <Link
                              to='/friends'
                              onClick={() =>
                                deleteFrRequest(pendingFr._id.$oid)
                              }
                              className='btn btn-secondary'
                            >
                              Delete Request
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>

            <hr />

            <div className='card shadow mb-4'>
              <div className='card-header py-3'>
                <h6 className='m-0 font-weight-bold text-primary'>
                  People You May Know
                </h6>
              </div>
              {friendSuggestion.length > 0
                ? friendSuggestion.map((frUser) => (
                    <div
                      key={frUser._id.$oid}
                      id='posts-list'
                      className='card-body friendCard'
                    >
                      <div className='post-card card'>
                        <div className='row'>
                          <div className='col-sm-12 col-md-12 col-lg-4'>
                            <img
                              src={IMAGEURL+frUser.image}
                              alt='User'
                              className='friendImageProfile'
                            />
                          </div>
                          <div className='col-sm-12 col-md-12 col-lg-8'>
                            <Link
                              to={{
                                pathname: '/profile',
                                state: {
                                  id: frUser._id.$oid,
                                },
                              }}
                            >
                              <h4>{frUser.name}</h4>
                            </Link>
                            {frUser.hasOwnProperty('friend_pending') ? (
                              frUser.friend_pending.filter(
                                (fr) => fr.$id.$oid === user._id.$oid
                              ).length > 0 ? (
                                <>
                                  <Link
                                    to='/friends'
                                    onClick={() =>
                                      cancelFrRequest(frUser._id.$oid)
                                    }
                                    className='btn btn-secondary'
                                  >
                                    Cancel Request
                                  </Link>
                                </>
                              ) : (
                                <>
                                  <Link
                                    to='/friends'
                                    onClick={() =>
                                      addFriendRequest(frUser._id.$oid)
                                    }
                                    className='btn btn-primary'
                                  >
                                    Add Friend
                                  </Link>
                                </>
                              )
                            ) : (
                              <>
                                <Link
                                  to='/friends'
                                  onClick={() =>
                                    sendFriendRequest(frUser._id.$oid)
                                  }
                                  className='btn btn-primary'
                                >
                                  Add Friend
                                </Link>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>

          <Advertisement />
        </div>
      </div>
    </Fragment>
  );
};
AddFriendList.propTypes = {
  //setAlert: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  friend: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  friend: state.friend
});
export default connect(mapStateToProps, {
  getAllUsers,
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
  cancelFriendRequest,
  getPendingFrUser,
  loadUser,
  getFriendSuggestion
})(AddFriendList);
