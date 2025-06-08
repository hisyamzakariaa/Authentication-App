import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);

    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your inputs and try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating user..."} />;
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="" style={{ flex: 1 }}>
        <AuthContent isLogin={false} onAuthenticate={signupHandler} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default SignupScreen;
