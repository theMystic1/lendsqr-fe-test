import {
  Fragment,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { User } from "../../types/type";
import { getUserById, updateUser } from "../../server/server";
import { Skeleton } from "../ui/loading";
import { Column, Row } from "../ui/filterDrop";
import CustomBtn from "../ui/button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Card from "../ui/card";
import { det, IMgs } from "../../constants/constant";
import StarRating from "../ui/ratings";
import { formatNumber } from "../../utils/helpers";
import { useCustomParams } from "../../hooks/useCustomParam";
import toast from "react-hot-toast";

function UserInfo() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    const getSingleUser = async () => {
      setLoading(true);

      const res = await getUserById(id!);

      setUser(res as User);

      setLoading(false);
    };

    getSingleUser();
  }, [id, refetchKey]);

  if (loading) return <Skeleton lines={20} />;

  return (
    <Column className="gap-8 mt-12">
      <Row className="justify-start">
        <BackBtn />
      </Row>
      <Header user={user!} setRefetchKey={setRefetchKey} />
      <HeaderBanner user={user!} />
      <InfoBanner user={user!} />
    </Column>
  );
}

export default UserInfo;

const Header = ({
  user,
  setRefetchKey,
}: {
  user: User;
  setRefetchKey?: Dispatch<SetStateAction<number>>;
}) => {
  const handleActivation = async () => {
    toast.loading("updating user....");
    try {
      await updateUser(user.id, {
        status: user?.status === "active" ? "inactive" : "active",
      });
      toast.remove();
      toast.success("User update successful......");
      setRefetchKey?.((num: number) => num + 1);
    } catch (error: any) {
      const err = error.message || "Operation failed";

      toast.remove();
      toast.error(err);
    }
  };
  return (
    <Row className="justify-between  gap-4">
      <h3>User Details</h3>
      <Row className="gap-4">
        {user?.status === "active" ? (
          <CustomBtn
            variant="danger-outline"
            onClick={() => handleActivation()}
          >
            BLACKLIST USER
          </CustomBtn>
        ) : (
          <CustomBtn
            variant="primary-outline"
            onClick={() => handleActivation()}
          >
            ACTIVATE USER
          </CustomBtn>
        )}
      </Row>
    </Row>
  );
};

const BackBtn = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const path = pathname.split("/")[1];

  return (
    <button className="back-btn" onClick={() => navigate(`/${path}`)}>
      <Row className="gap-2">
        <KeyboardBackspaceIcon />

        <p>Back to users</p>
      </Row>
    </button>
  );
};

const HeaderBanner = ({ user }: { user: User }) => {
  return (
    <Card className="p-8 card_once relative">
      <div className="grid-3 grid place-items-center relative">
        <Row className="gap-2">
          <Row className="userHeader__profilePic justify-center">
            <img src={IMgs.usericon} />
          </Row>
          <Column className="items-start gap-0">
            <h3>{user?.fullName}</h3>
            <p>{user?.gender}</p>
          </Column>
        </Row>
        <Column className="items-start gap-0 userHeader__tier p-4 tier2">
          <p>Users tier</p>
          <StarRating readOnly value={2} />
        </Column>
        <Column className="items-start gap-0">
          <p>₦{formatNumber(200000)}.00</p>
          <p className="userHeader__p">
            {user?.id?.slice(0, 10)}/providus bank
          </p>
          {/* <StarRating readOnly value={2} /> */}
        </Column>
      </div>
      <Row className="absolute bottom-0 userHeader__nav ">
        <NavB />
      </Row>
    </Card>
  );
};

const InfoBanner = ({ user }: { user: User }) => {
  return (
    <Card className="p-4 flex flex-col items-start gap-8">
      <Column className=" items-start gap-4 colBorder">
        <h3>Personal Information</h3>
        <div className="grid grid-5 gap-6 align-between">
          <LabelInfo label={"FULL NAME"} value={user?.fullName} />
          <LabelInfo
            label={"PHONE NUMBER"}
            value={user?.phoneNumber.toString()}
          />
          <LabelInfo label={"EMAIL ADDRESS"} value={user?.emailAddress} />
          <LabelInfo label={"BVN"} value={user?.bvn.toString()} />
          <LabelInfo label={"GENDER"} value={user?.gender} />
          <LabelInfo label={"MARITAL STATUS"} value={user?.maritalStatus} />
          <LabelInfo label={"CHILDREN"} value={user?.children.toString()} />
          <LabelInfo
            label={"TYPE OF RESIDENCY"}
            value={user?.typeOfResidence}
          />
        </div>
      </Column>
      <Column className=" items-start gap-4 colBorder">
        <h3>Education and Employment</h3>
        <div className="grid grid-4 gap-6">
          <LabelInfo
            label={"level of education"}
            value={user?.levelOfEducation}
          />
          <LabelInfo
            label={"employment status"}
            value={user?.employmentStatus.toString()}
          />
          <LabelInfo
            label={"sector of employment"}
            value={user?.sectorOfEmployment}
          />
          <LabelInfo
            label={"Duration of employment"}
            value={user?.durationOfEmployment.toString()}
          />
          <LabelInfo label={"office email"} value={user?.officeEmail} />
          <LabelInfo label={"Monthly income"} value={user?.monthlyIncome} />
          <LabelInfo
            label={"loan repayment"}
            value={user?.loanRepayment.toString()}
          />
        </div>
      </Column>
      <Column className=" items-start gap-4 colBorder">
        <h3>Socials</h3>
        <div className="grid grid-4 gap-6">
          <LabelInfo label={"Twitter"} value={user?.twitter} />
          <LabelInfo label={"Facebook"} value={user?.facebook.toString()} />
          <LabelInfo label={"Instagram"} value={user?.instagram} />
        </div>
      </Column>
      <Column className=" items-start gap-4 colBorder">
        <h3>Guarantor</h3>
        <div className="grid grid-4 gap-6 ">
          {user?.guarantors.map((gr) => (
            <Fragment key={gr.guarantorFullName}>
              <LabelInfo label={"full Name"} value={gr.guarantorFullName} />
              <LabelInfo
                label={"Phone Number"}
                value={gr?.guarantorPhoneNumber.toString()}
              />
              <LabelInfo
                label={"Email Address"}
                value={gr?.guarantorEmailAddress}
              />

              <LabelInfo
                label={"Relationship"}
                value={gr?.guarantorRelationship}
              />
            </Fragment>
          ))}
        </div>
      </Column>
    </Card>
  );
};

const LabelInfo = ({ label, value }: { label: string; value: string }) => {
  return (
    <Column className="labelInfo flex flex-col items-start">
      <p>{label}</p>
      <h3>{value}</h3>
    </Column>
  );
};

const NavB = () => {
  const { getParam, updateQuery } = useCustomParams();

  const detParam = getParam("details") || "general";
  return (
    <Row className="justify-between userHeader__nav">
      {det.map((d) => (
        <button
          className={`${d.value === detParam ? "activeH" : "inCtiveH"}`}
          key={d.value}
          onClick={() =>
            d.value === "general"
              ? updateQuery("details", "")
              : updateQuery("details", d.value)
          }
        >
          {d.label}
        </button>
      ))}
    </Row>
  );
};
