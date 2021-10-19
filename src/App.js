import "react-toastify/dist/ReactToastify.css";
import "./styles/css/App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TheContext from "./context/context";
import mnText from "./constants/mnText";
import enText from "./constants/enText";
import { useQuery } from "@apollo/client";
import { ACCOUNT } from "./graphql/gql/user/user";
import { CircularProgress } from "@mui/material";
import { isAuthenticated, roleChecker } from "./helpers/helperFunctions";
import PrivateRoute from "./components/privateRoute/privateRoute";
import useAppStyles from "./styles/js/classes";
import MessengerCustomerChat from "react-messenger-customer-chat";
import SMicon from "./assets/icons/SM.svg";
// General
import Home from "./pages/general/home";
import Detailnews from "./pages/Detailnews/Detailnews";
import NotFound from "./pages/general/notFound";
import SignUp from "./pages/general/signUp";
import Login from "./pages/general/jamukhLogin";
import Service from "./pages/user/service";
import AvailGoods from "./pages/general/availGoods";
import GoodsDetail from "./pages/general/goodsDetail";
import TermsAndConditions from "./pages/general/termsAndConditions";
// Member
import Members from "./pages/members/members";
// import Profile from "./pages/user/profileEdit";
import Profile from "./pages/profile/profile"
import Property from "./pages/property/property"
import UserQrCode from "./pages/user/userQrCode";
import PaymentService from "./pages/user/paymentService";
import PaymentOrder from "./pages/user/paymentOrder";
import MarketList from "./pages/user/marketList";
import UserBasket from "./pages/user/basket";
import OrderList from "./pages/user/orderList";
import MarkteerGoodsList from "./pages/marketeer/marketGoodsList";
import MarkteerGoodsDetail from "./pages/marketeer/marketGoodsDetail";
// Superadmin
import AdminList from "./pages/superadmin/adminList";
import SuperAdminProfileEdit from "./pages/superadmin/profileEdit";
// Admin
import UserList from "./pages/admin/userList";
import AdminMarketeerList from "./pages/admin/marketeerList";
import AdminProfileEdit from "./pages/admin/profileEdit";
import UserOrderList from "./pages/admin/userOrderList";
import OperatorList from "./pages/admin/operatorList";
import MarketOrderList from "./pages/admin/marketOrderList";
// Operator
import ShippingList from "./pages/operator/shippingList";
import GoodsList from "./pages/operator/goodsList";
import OperatorMarketeerList from "./pages/operator/marketeerList";
import OperatorMarketeerOrderList from "./pages/operator/marketeerOrderList";
import CategoryList from "./pages/operator/categoryList";
import OperatorProfileEdit from "./pages/operator/profileEdit";
// Marketeer
import MarketeerBasket from "./pages/marketeer/basket";
import MarketeerOrderList from "./pages/marketeer/orderList";
import MarketeerProfileEdit from "./pages/marketeer/profileEdit";
import MarketeerUserOrderList from "./pages/marketeer/userOrderList";
import MarketeerUserPurchaseList from "./pages/marketeer/userPurchaseList";
import MarketeerGoodsList from "./pages/marketeer/goodsList";

export default function App() {
  const classes = useAppStyles();

  const { data: accountData, loading } = useQuery(ACCOUNT, {
    fetchPolicy: "cache-and-network",
    onCompleted(data) {
      console.log(data);
      if (data?.me) {
        if (data?.me?.role !== "guest") {
          localStorage.setItem("authenticated", "true");
        } else {
          localStorage.setItem("authenticated", "false");
        }
      } else {
        localStorage.setItem("authenticated", "false");
      }
    },
    onError(e) {
      console.log(e);
    },
  });

  const [contextValue, setContextValue] = useState({
    contextText:
      localStorage.getItem("activeLang") !== null
        ? localStorage.getItem("activeLang") === "mn"
          ? mnText
          : enText
        : mnText,
    activeLang: localStorage.getItem("activeLang") !== null ? localStorage.getItem("activeLang") : "mn",
  });

  const langChange = (lang) => {
    setContextValue(
      lang === "en" ? { contextText: enText, activeLang: "en" } : { contextText: mnText, activeLang: "mn" }
    );
    localStorage.setItem("activeLang", lang);
  };

  if (loading)
    return (
      <div className={classes.loading}>
        <img src={SMicon} alt={"SM icon"} style={{ paddingBottom: 20 }} />
        <CircularProgress />
      </div>
    );

  return (
    <div className="App">
      <TheContext.Provider value={{ contextValue, langChange, account: accountData?.me }}>
        <Router forceRefresh={true}>
          <Switch>
            {/* General routes */}
            <Route exact path={"/"}>
              <Home />
            </Route>
            <Route path={"/login"}>
              <Login />
            </Route>
            <Route path={"/property"}>
              <Property/>
            </Route>
            <Route path={"/members"}>
              <Members />
            </Route>
            <Route path={"/detailnews/:id"}>
              <Detailnews />
            </Route>
            
            <Route path={"/profile"}>
              <Profile />
            </Route>
            <Route path={"/sign-up"}>
              <SignUp />
            </Route>
            <Route path={"/category/:id"}>
              <CategoryList />
            </Route>
            <Route path={"/terms-and-conditions"}>
              <TermsAndConditions />
            </Route>
            <Route path={"/available-goods"}>
              <AvailGoods />
            </Route>
            <Route path={"/goods-detail"}>
              <GoodsDetail />
            </Route>
            <Route path={"/user/services"}>
              <Service />
            </Route>

            {/* Private page. Works only if the user is authenticated and the role is MEMBER */}

            <PrivateRoute path={"/user/profile"} authenticated={isAuthenticated()}>
              <Profile />
            </PrivateRoute>
            <PrivateRoute path={"/user/user-qr-code"} authenticated={isAuthenticated()}>
              <UserQrCode />
            </PrivateRoute>
            <PrivateRoute
              path={"/user/payment-service"}
              check={roleChecker(["member"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <PaymentService />
            </PrivateRoute>
            <PrivateRoute
              path={"/user/payment-order"}
              check={roleChecker(["member"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <PaymentOrder />
            </PrivateRoute>
            <PrivateRoute
              path={"/user/basket"}
              check={roleChecker(["member"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <UserBasket />
            </PrivateRoute>
            <PrivateRoute
              path={"/user/order-list"}
              check={roleChecker(["member"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <OrderList />
            </PrivateRoute>
            <PrivateRoute
              path={"/user/market-list"}
              role
              check={roleChecker(["member"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
            >
              <MarketList />
            </PrivateRoute>
            <PrivateRoute
              path={"/user/market-goods-list"}
              role
              check={roleChecker(["member"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
            >
              <MarkteerGoodsList />
            </PrivateRoute>
            <PrivateRoute
              path={"/user/market-goods-detail"}
              role
              check={roleChecker(["member"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
            >
              <MarkteerGoodsDetail />
            </PrivateRoute>

            {/* Private page. Works only if the user is authenticated and the role is SUPERADMIN */}

            <PrivateRoute
              path={"/admin-list"}
              check={roleChecker(["superadmin"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <AdminList />
            </PrivateRoute>
            <PrivateRoute
              path={"/admin-profile"}
              check={roleChecker(["superadmin"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <SuperAdminProfileEdit />
            </PrivateRoute>

            {/* If the account role is ADMIN */}

            <PrivateRoute
              path={"/admin/operator-list"}
              check={roleChecker(["admin"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <OperatorList />
            </PrivateRoute>
            <PrivateRoute
              path={"/admin/user-list"}
              check={roleChecker(["admin"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <UserList />
            </PrivateRoute>
            <PrivateRoute
              path={"/admin/marketeer-list"}
              check={roleChecker(["admin"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <AdminMarketeerList />
            </PrivateRoute>
            <PrivateRoute
              path={"/admin/market-order-list"}
              check={roleChecker(["admin"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <MarketOrderList />
            </PrivateRoute>
            <PrivateRoute
              path={"/admin/profile-edit"}
              role
              check={roleChecker(["admin"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
            >
              <AdminProfileEdit />
            </PrivateRoute>
            <PrivateRoute
              path={"/admin/user-order-list"}
              role
              check={roleChecker(["admin"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
            >
              <UserOrderList />
            </PrivateRoute>

            {/* If the account role is OPERATOR */}

            <PrivateRoute
              path={"/operator/goods"}
              check={roleChecker(["operator"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <GoodsList />
            </PrivateRoute>
            <PrivateRoute
              path={"/operator/category-list"}
              check={roleChecker(["operator"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <CategoryList />
            </PrivateRoute>
            <PrivateRoute
              path={"/operator/shipping-list"}
              check={roleChecker(["operator"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <ShippingList />
            </PrivateRoute>
            <PrivateRoute
              path={"/operator/marketeer-list"}
              check={roleChecker(["operator"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <OperatorMarketeerList />
            </PrivateRoute>
            <PrivateRoute
              path={"/operator/marketeer-order-list"}
              check={roleChecker(["operator"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <OperatorMarketeerOrderList />
            </PrivateRoute>
            <PrivateRoute
              path={"/operator/profile-edit"}
              check={roleChecker(["operator"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <OperatorProfileEdit />
            </PrivateRoute>

            {/* If the account role is MARKETEER */}

            <PrivateRoute
              path={"/marketeer/basket"}
              check={roleChecker(["marketeer"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <MarketeerBasket />
            </PrivateRoute>
            <PrivateRoute
              path={"/marketeer/goods-list"}
              check={roleChecker(["marketeer"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <MarketeerGoodsList />
            </PrivateRoute>
            <PrivateRoute
              path={"/marketeer/order-list"}
              check={roleChecker(["marketeer"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <MarketeerOrderList />
            </PrivateRoute>
            <PrivateRoute
              path={"/marketeer/profile-edit"}
              check={roleChecker(["marketeer"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <MarketeerProfileEdit />
            </PrivateRoute>
            <PrivateRoute
              path={"/marketeer/user-order-list"}
              check={roleChecker(["marketeer"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <MarketeerUserOrderList />
            </PrivateRoute>
            <PrivateRoute
              path={"/marketeer/user-purchase-list"}
              check={roleChecker(["marketeer"], accountData?.me?.role)}
              authenticated={isAuthenticated()}
              role
            >
              <MarketeerUserPurchaseList />
            </PrivateRoute>

            {/* 404 page. Must be at the bottom. */}
            <Route path={"*"}>
              <NotFound />
            </Route>
          </Switch>
          <div className={classes.chatContainer}>
            <MessengerCustomerChat pageId="172124671568987" appId="517106409387369" />
          </div>
        </Router>
      </TheContext.Provider>
    </div>
  );
}
