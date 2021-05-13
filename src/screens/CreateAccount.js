import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faVolleyballBall} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import {useForm} from "react-hook-form"
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import routes from "../routes";


const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const WhiteBox = styled.div`
    background-color: white;
    border: 1px solid rgb(219,219,219);
    width: 100%;
`

const TopBox = styled(WhiteBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px 40px 25px 40px;
    form {
        margin-top: 35px;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
    }
`;


const Input = styled.input`
    width: 100%;
    border-radius: 3px;
    padding: 7px;
    background-color: #fafafa;
    border: .5px solid rgb(219,219,219);
    ${(props) => (props.haserror==="true" ? "tomato" : props.theme.borderColor)};
    margin-top: 5px;
    box-sizing: border-box;
    &::placeholder {
        font-size: 12px;
    }
    &:focus {
        border-color: rgb(38, 38, 38);
    }
`

const Button = styled.input`
    border: none;
    border-radius: 3px;
    margin-top: 12px;
    background-color: ${(props) => props.theme.accent};
    color: white;
    text-align: center;
    padding: 8px 0px;
    font-weight: 600;
    width: 100%;
    opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

const SSeparator = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
`;



const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
`

const CREATEACCOUNT_MUTATION = gql`
    mutation createAccount(
            $firstname: String!, 
            $lastname: String, 
            $username:String!,
            $email: String!,
            $rollno: String!,
            $mobileno: String!
            $gender: String!
            $dob: String!
            $batch: String!
            $year: String!
            $idType: String!
            $password:String!){
        createAccount(
            firstname: $firstname,
            lastname: $lastname, 
            username:$username,
            email: $email, 
            rollno: $rollno,
            mobileno: $mobileno,
            gender: $gender,
            dob: $dob,
            batch: $batch,
            year: $year,
            idType: $idType,
            password:$password ) {
            ok
            error
        }
    }
`


function CreateAccount () {

    const history = useHistory();

    const{register, handleSubmit, formState:{ errors},formState, getValues, setError, clearErrors,} = useForm({
        mode: "onChange",
    });
    
    const onCompleted = (data)=> {
        const { username, password } = getValues();
        const {createAccount : {ok}} = data;
        if(!ok){
            return;
        }
        history.push(routes.home, {
            message: "Account created. Please log in.",
            username,
            password,
          });
    };

    const [createAccount, {loading}] = useMutation(CREATEACCOUNT_MUTATION, {
        onCompleted,
    });

    const onSubmitValid = (data) => {
        // console.log(data);
        if(loading){
            return ;
        }
        console.log(data);
        createAccount({
            variables: {
                ...data
            },
        });
    };
    return (
        <Container>
            <Wrapper>
            <PageTitle title="CreateAccount"/>
                <TopBox>
                    <div>
                        <FontAwesomeIcon icon={faVolleyballBall} size="3x"/>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitValid)}>
                        <Input
                        name = "firstname"
                        {...
                            register("firstname",{
                                required: "firstname is Required",
                            })}
                        type="text" placeholder="firstname"/>
                        <Input 
                        name="lastname"
                        {...
                            register("lastname",{})}
                        type="text" placeholder="lastname"/>
                        <Input 
                        name="email"
                        {...
                            register("email",{
                                required: "email is Required",
                            })}
                        type="text" placeholder="email"/>
                        <Input 
                        name="username"
                        {...
                            register("username",{
                                required: "Username is Required",
                            })}
                        type="text" placeholder="Username"/>

                        <Input 
                        name="rollno"
                        {...
                            register("rollno",{
                                required: "rollno is Required",
                            })}
                        type="text" placeholder="rollno"/>
                        <Input 
                        name="mobileno"
                        {...
                            register("mobileno",{
                                required: "mobileno is Required",
                            })}
                        type="text" placeholder="mobileno"/>
                        <Input 
                        name="gender"
                        {...
                            register("gender",{
                                required: "gender is Required",
                            })}
                        type="text" placeholder="gender"/>
                        <Input 
                        name="dob"
                        {...
                            register("dob",{
                                required: "dob is Required",
                            })}
                        type="text" placeholder="dob"/>
                        <Input 
                        name="batch"
                        {...
                            register("batch",{
                                required: "batch is Required",
                            })}
                        type="text" placeholder="batch"/>
                        <Input 
                        name="year"
                        {...
                            register("year",{
                                required: "year is Required",
                            })}
                        type="text" placeholder="year"/>
                        <Input 
                        name="idType"
                        {...
                            register("idType",{
                                required: "idType is Required",
                            })}
                        type="text" placeholder="idType"/>
                        <Input 
                        name="password"
                        {...
                            register("password",{
                                required: "Password Required",
                            })}
                        type="password" placeholder="Password"/>

                        <Button type="submit"
                        value={loading ? "Loading..." : "Create Account"}
                        disabled={!formState.isValid || loading} />


                    </form>

                    <SSeparator>
                        <div></div>
                    </SSeparator>
                </TopBox>

            </Wrapper>
        </Container>
    );
}
export default CreateAccount;