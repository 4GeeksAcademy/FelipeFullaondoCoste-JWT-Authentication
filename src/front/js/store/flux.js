const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {

			getLogin: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/user/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});
			
					const data = await resp.json();
			
					if (resp.ok) {
						setStore({ user: data });
						return data;
					} else {
						setStore({ error: data.message || "Login failed" });
						console.log("Error de login:", data.message);
						return null;
					}
				} catch (error) {
					console.log("Error loading login data", error);
					setStore({ error: "Error en el login" });
				}
			},
			getRegister: async (email, password, is_active = true) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/user", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password, is_active }),
					});
			
					const data = await resp.json();
			
					if (resp.ok) {
						setStore({ user: data });
						return data; 
					} else {
						setStore({ error: data.message || "Registration failed" });
						console.log("Error de registro:", data.message);
						return null;
					}
				} catch (error) {
					console.log("Error loading registration data", error);
					setStore({ error: "Error en el registro" });
				}
			},
			
			







			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
