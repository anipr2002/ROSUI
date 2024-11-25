"use client";
import React from "react";
import useServiceStore from "@/store/serviceStore";

const Services = () => {
  const { services } = useServiceStore();
  console.log(services);
  return <div>Services</div>;
};

export default Services;
