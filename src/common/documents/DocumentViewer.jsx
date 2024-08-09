import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const DocumentViewer = ({ fileUrl, data }) => {
    // const docs = [{ uri: fileUrl }];
    // const docs = [{ uri: "https://m.kcptl.in/campaign/download/dipesh/57220006163109.pdf" }];
    // const docs = [{ uri: "https://m.kcptl.in/docs/docsBuffer/doctemplet.docx" }];

    if (fileUrl === "") return <div className="h-full w-full bg-white" >on file path found</div>
    const docs = [
        {
            uri: `https://m.kcptl.in/docs/docsBuffer/${fileUrl}`,
            fileType: "docx",
            fileName: data?.name,
        }
    ];

    return (
        <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            // initialActiveDocument={docs[0]}
            config={{
                header: {
                    disableHeader: true,
                },
            }}
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default DocumentViewer;