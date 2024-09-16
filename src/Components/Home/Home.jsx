import React, { useState } from "react";
import style from "./Home.module.css";
import { IoPerson, IoPersonCircleOutline } from "react-icons/io5";
import { FaCaretDown, FaCaretUp, FaHamburger } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Home = () => {
  const navigate = useNavigate();

  const [passwordShow, setPasswordShow] = useState(false);
  const [menuListShow, setMenuListShow] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const userDetails = localStorage.getItem("userData");
  const userData = JSON.parse(userDetails);
  console.log(userData);

  return (
    <>
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.headerLeft}>
            <IoPerson />
            <p>
              Hi {userData[0]?.user_firstname}! Your careers at your finger tips{" "}
            </p>
          </div>
          <div className={style.headerRight}>
            <div className={style.menuList}>
              <ul>
                <li>Overview</li>
                <li>Users</li>
                <li>Organizations</li>
                <li>MY Account</li>
                <li
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Log Out
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={style.homeBody}>
          <div className={style.userDetailSection}>
            <div className={style.userSectionHeader}>
              <div className={style.userHeaderLeft}>
                <div className={style.userImage}>
                  <IoPersonCircleOutline />
                  <p>{userData[0]?.user_id}</p>
                </div>
                <div className={style.userInfoList}>
                  <div className={style.userInfo}>
                    <div className={style.infoValue}>
                      <p>Name :</p>
                      <p>
                        {userData[0]?.user_firstname}{" "}
                        {userData[0]?.user_lastname}
                      </p>
                    </div>
                    <div className={style.infoValue}>
                      <p>Email :</p>
                      <p>{userData[0]?.user_email}</p>
                    </div>
                  </div>
                  <div className={style.userInfo}>
                    <div className={style.infoValue}>
                      <p>Phone :</p>
                      <p>{userData[0]?.user_phone}</p>
                    </div>
                    <div
                      className={style.infoValue}
                      onMouseEnter={() => {
                        setPasswordShow(true);
                      }}
                      onMouseLeave={() => {
                        setPasswordShow(false);
                      }}
                    >
                      <p>Password :</p>
                      {passwordShow ? (
                        <p>{userData[0]?.user_password}</p>
                      ) : (
                        <p>******</p>
                      )}
                    </div>
                  </div>
                  <div className={style.userInfo}>
                    <div className={style.infoValue}>
                      <p>City :</p>
                      <p>{userData[0]?.user_city}</p>
                    </div>
                    <div className={style.infoValue}>
                      <p>Zip code :</p>
                      <p>{userData[0]?.user_zipcode}</p>
                    </div>
                  </div>
                  <div className={style.userInfo}>
                    <div className={style.infoValue}>
                      <p>Gender :</p>
                      <p>{userData[0]?.user_gender}</p>
                    </div>
                    <div className={style.infoValue}>
                      <p>Address :</p>
                      <p>{userData[0]?.user_address1}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.userHeaderRight}>
                <button>Delete profile</button>
                <button>Edit profile</button>
                <button>View profile</button>
              </div>
            </div>
          </div>
          <div className={style.dataSection}>
            <div className={style.firstSectionHeader}>
              <div className={style.firstHeaderValue}>
                <p>Bounce Rate</p>
              </div>
              <div className={style.firstHeaderValue}>
                <p>Page Views</p>
              </div>
              <div className={style.firstHeaderValue}>
                <p>New Sessions</p>
              </div>
              <div className={style.firstHeaderValue}>
                <p>Avg. Time on Site</p>
              </div>
              <div className={style.firstHeaderValue}>
                <p>New Sessions</p>
              </div>
            </div>
            <div className={style.firstDataList}>
              <div className={style.dataValue}>
                <p>32.53%</p>
              </div>
              <div className={style.dataValue}>
                <p>7,682</p>
              </div>
              <div className={style.dataValue}>
                <p>68.8</p>
              </div>
              <div className={style.dataValue}>
                <p>2m:35s</p>
              </div>
              <div className={style.dataValue}>
                <p>68.8</p>
              </div>
            </div>
            <div className={style.fistRateList}>
              <div className={style.downRate}>
                <FaCaretDown />
                <p>-0.5%</p>
              </div>
              <div className={style.upRate}>
                <FaCaretUp />
                <p> +0.1%</p>
              </div>
              <div className={style.downRate}>
                <FaCaretDown />
                <p>-0.5%</p>
              </div>
              <div className={style.upRate}>
                <FaCaretUp />
                <p> +25%</p>
              </div>
              <div className={style.upRate}>
                <FaCaretUp />
                <p> +10%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.mContainer}>
        <div className={style.mHeader}>
          <div className={style.mHeaderLeft}>
            <IoPerson />
            <p>Hi {userData[0]?.user_firstname}</p>
          </div>
          <div className={style.mHeaderRight}>
            <GiHamburgerMenu
              onClick={() => {
                setMenuListShow(!menuListShow);
              }}
            />
            {menuListShow && (
              <div className={style.mMenuContainer}>
                <ul>
                  <li>Overview</li>
                  <li>Users</li>
                  <li>Organizations</li>
                  <li>MY Account</li>
                  <li
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className={style.mUserDetailSection}>
          <div className={style.mUserSectionHeader}>
            <div className={style.mUserHeaderLeft}>
              <IoPersonCircleOutline />
              <p>{userData[0]?.user_id}</p>
            </div>
            <div className={style.mUserHeaderRight}>
              <button>Delete profile</button>
              <button>Edit profile</button>
              <button>View profile</button>
            </div>
          </div>
          <div className={style.mUserInfoSection}>
            <div className={style.mUserInfoLeft}>
              <p>Name :</p>
              <p>Email :</p>
              <p>Phone :</p>

              <p>Password :</p>
              <p>City :</p>
              <p>Zip code :</p>

              <p>Gender :</p>
              <p>Address :</p>
            </div>

            <div className={style.userInfoRight}>
              <p>
                {userData[0]?.user_firstname} {userData[0]?.user_lastname}
              </p>
              <p>{userData[0]?.user_email}</p>
              <p>{userData[0]?.user_phone}</p>
              <p>{userData[0]?.user_password}</p>
              <p>{userData[0]?.user_city}</p>
              <p>{userData[0]?.user_zipcode}</p>
              <p>{userData[0]?.user_gender}</p>
              <p>{userData[0]?.user_address1}</p>
            </div>
          </div>
        </div>
        <div className={style.mUserDataListSection}>
          <div className={style.mUserDataList}>
            <div className={style.mDataListLeft}>
              <p>Bounce Rate</p>
            </div>
            <div className={style.mDataListRight}>
              <p>32.53%</p>
              <div className={style.mDownRate}>
                <FaCaretDown />
                <p>-0.5%</p>
              </div>
            </div>
          </div>

          <div className={style.mUserDataList}>
            <div className={style.mDataListLeft}>
              <p>Page Views</p>
            </div>
            <div className={style.mDataListRight}>
              <p>7,682</p>
              <div className={style.mUpRate}>
                <FaCaretUp />
                <p> +0.1%</p>
              </div>
            </div>
          </div>

          <div className={style.mUserDataList}>
            <div className={style.mDataListLeft}>
              <p>New Sessions</p>
            </div>
            <div className={style.mDataListRight}>
              <p>68.8</p>
              <div className={style.mDownRate}>
                <FaCaretDown />
                <p>-0.5%</p>
              </div>
            </div>
          </div>

          <div className={style.mUserDataList}>
            <div className={style.mDataListLeft}>
              <p>Avg. Time on Site</p>
            </div>
            <div className={style.mDataListRight}>
              <p>2m:35s</p>
              <div className={style.mUpRate}>
                <FaCaretUp />
                <p> +25%</p>
              </div>
            </div>
          </div>

          <div className={style.mUserDataList}>
            <div className={style.mDataListLeft}>
              <p>New Sessions</p>
            </div>
            <div className={style.mDataListRight}>
              <p>68.8</p>
              <div className={style.mUpRate}>
                <FaCaretUp />
                <p> +10%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
