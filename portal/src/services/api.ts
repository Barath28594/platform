const API_BASE_URL = "/api";

export async function createApplication(application: any) {

    const response = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(application)
    });

    if (!response.ok) {
        throw new Error("Failed to create application");
    }

    return response.json();
}