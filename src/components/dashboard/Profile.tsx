"use client";
import { IUser } from "@/db/models/userModel";
import { dateString, statusColor } from "@/lib/helperFunctions";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface IProfileProps {
  user: IUser;
}

const Profile = ({ user }: IProfileProps) => {
  const {
    name,
    email,
    gender,
    status,
    role,
    image,
    isVerified,
    lastLogin,
    passwordChangedAt,
    createdAt,
  } = user || {};

  const [date, setDate] = useState({
    createdAt: "",
    lastLogin: "",
    passwordChangedAt: "",
  });

  useEffect(() => {
    setDate({
      createdAt: dateString(createdAt),
      lastLogin: dateString(lastLogin),
      passwordChangedAt: dateString(passwordChangedAt),
    });
  }, [createdAt, lastLogin, passwordChangedAt]);

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
      <Image
        src={image || "/defaultProfile.jpeg"}
        className={`rounded-full w-48 h-48  col-span-1 md:col-span-2 justify-self-center ring-4 ring-${statusColor(
          status
        )} ring-offset-[3px] ring-offset-${statusColor(role)}`}
        width={180}
        height={180}
        alt={name}
        loading="lazy"
      />
      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block font-semibold text-gray-300">Full Name</label>
          <p className="text-white flex gap-2">
            {name}{" "}
            {isVerified ? (
              <BadgeCheck size={14} className="text-green-400" />
            ) : (
              <BadgeCheck size={14} />
            )}
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold text-gray-300">Email</label>
          <p className="text-white">{email}</p>
        </div>

        {/* Gender */}
        <div>
          <label className="block font-semibold text-gray-300">Gender</label>
          <p className="text-white">{gender}</p>
        </div>

        {/* Status */}
        <div>
          <label className="block font-semibold text-gray-300">Status</label>
          <p className={`font-semibold capitalize text-${statusColor(status)}`}>
            {status}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Role */}
        <div>
          <label className="block font-semibold text-gray-300">Role</label>
          <p
            className={`font-semibold tracking-wider uppercase text-${statusColor(
              role
            )}`}
          >
            {role}
          </p>
        </div>

        {/* Last Login */}
        <div>
          <label className="block font-semibold text-gray-300">
            Last Login
          </label>
          <p className="text-white">{date.lastLogin}</p>
        </div>

        {/* Password Changed */}
        <div>
          <label className="block font-semibold text-gray-300">
            Password Changed
          </label>
          <p className="text-white">{date.passwordChangedAt}</p>
        </div>

        {/* Account Created */}
        <div>
          <label className="block font-semibold text-gray-300">
            Account Created
          </label>
          <p className="text-white">{date.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
