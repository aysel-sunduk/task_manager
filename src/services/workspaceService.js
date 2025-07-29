// services/workspaceService.js
/*
export const createWorkspace = async (workspaceName, memberId) => {
  try {
    const response = await fetch('http://localhost:8080/api/workspaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Gerekirse token:
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        workspaceName,
        memberId
      }),
    });

    if (!response.ok) {
      throw new Error('Workspace oluşturulamadı.');
    }

    return await response.json();
  } catch (error) {
    console.error('API Hatası:', error);
    throw error;
  }
};*/
