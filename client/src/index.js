import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./components/Auth0ProviderWithHistory";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
	<BrowserRouter>
		<Auth0ProviderWithHistory>
			<App />
		</Auth0ProviderWithHistory>
	</BrowserRouter>
);