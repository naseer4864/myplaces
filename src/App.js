import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Users-components/Navbar";
import NotFound from "./Users-components/notfound";
import Spinner from "./asset/spinner/spinner";

const UserList = lazy(() => import('./Users-components/Userlist'));
const NewPlaces = lazy(() => import('./Places-components/Place'));
const PlaceList = lazy(() => import('./Places-components/Placelist'));
const UpdatePlaces = lazy(() => import('./Places-components/updatePlaces'));
const Auth = lazy(() => import('./Users-components/Auth/Auth'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={
          <Suspense fallback={<Spinner />}>
            <UserList />
          </Suspense>
        } />
        <Route path="/Places/new" element={
          <Suspense fallback={<Spinner />}>
            <NewPlaces />
          </Suspense>
        } />
        <Route path="/:userId/Places" element={
          <Suspense fallback={<Spinner />}>
            <PlaceList />
          </Suspense>
        } />
        <Route path="/places/:placeId" element={
          <Suspense fallback={<Spinner />}>
            <UpdatePlaces />
          </Suspense>
        } />
        <Route path="/Auth" element={
          <Suspense fallback={<Spinner />}>
            <Auth />
          </Suspense>
        } />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;

