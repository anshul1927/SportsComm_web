import styled from "styled-components";
import {
    faFacebookSquare,
  } from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faVolleyballBall} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import {useForm} from "react-hook-form";
import FormError from "../components/FormError";
import {logUserIn} from "../apollo"

import { gql, useMutation } from "@apollo/client";

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
`

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
  span {
    margin: 0px 10px;
    font-weight: 600;
    font-size: 12px;
    color: #8e8e8e;
  }
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const BottomBox = styled(WhiteBox)`
    padding: 20px 0px;
    text-align: center;
    a {
        font-weight: 600;
        margin-left: 5px;
        color: ${(props) => props.theme.accent};
      }
`;

const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
`

const LOGIN_MUTATION = gql`
    mutation login($username:String!, $password:String!){
        login(username:$username, password:$password){
            ok
            token
            error
        }
    }
`

const Notification = styled.div`
  color: #2ecc71;
`;

function Login () {
    


    const location = useLocation();

    const { register, handleSubmit,formState:{ errors},formState, getValues, setError, clearErrors,} = useForm({
        mode: "onChange",
        defaultValues: {
            username: location?.state?.username || "",
            password: location?.state?.password || "",
          },
    });

    const onCompleted = (data)=> {
        const {login : {ok, error, token}} = data;
        if(!ok){
            return setError("result", {
                message: error,
            });
        }
        if(token){
            logUserIn(token);
        
        }
    };
    
    const [login, {loading}] = useMutation(LOGIN_MUTATION, {
        onCompleted,
    });
    console.log(loading);
    const onSubmitValid = (data) => {
        // console.log(data);
        if(loading){
            return ;
        }
        const {username ,password} = getValues();
        login({
            variables: {
                username,
                password
            },
        });
    };

    const clearLoginError = () => {
        clearErrors("result");
      };
    return (
        <Container>
            <Wrapper>
                <PageTitle title="Login"/>
                <TopBox>
                    <div>
                        <FontAwesomeIcon icon={faVolleyballBall} size="3x"/>
                    </div>
                    <Notification>{location?.state?.message}</Notification>
                    <form onSubmit={handleSubmit(onSubmitValid)}>
                        <Input 
                        name="username"
                        onClick={clearLoginError}
                        type="text" 
                        placeholder="Username"
                        haserror={Boolean(errors?.username?.message)}
                        {...
                            register("username",{
                                required: "Username Required",
                                message: "Username should be longer than 5 chars.",
                            })}/>
                        <FormError message={errors?.username?.message}/>
                        <Input 
                            name="password" 
                            onClick={clearLoginError}
                            type="password" 
                            placeholder="Password"
                            haserror={Boolean(errors?.password?.message)}
                            {...
                                register("password",{
                                    required: "Password is reqired",
                                })} />

                        <FormError message={errors?.password?.message}/>

                        <Button type="submit"
                        value={loading ? "Loading..." : "Log in"}
                        disabled={!formState.isValid || loading} />
                        <FormError message={errors?.result?.message}/>
                    </form>

                    <SSeparator>
                        <div></div>
                        <span>Or</span>
                        <div></div>
                    </SSeparator>
                    <FacebookLogin>
                        <FontAwesomeIcon icon={faFacebookSquare} />
                        <span>Log in with Facebook</span>
                    </FacebookLogin>
                </TopBox>

            </Wrapper>
        </Container>
    );
}
export default Login