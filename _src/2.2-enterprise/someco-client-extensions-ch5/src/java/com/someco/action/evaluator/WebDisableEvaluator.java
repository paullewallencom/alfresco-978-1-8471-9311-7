package com.someco.action.evaluator;

import javax.faces.context.FacesContext;

import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.web.action.ActionEvaluator;
import org.alfresco.web.bean.repository.Node;
import org.alfresco.web.bean.repository.Repository;

import com.someco.model.SomeCoModel;
import com.someco.util.Constants;
import com.someco.util.GroupMembershipCheck;

public class WebDisableEvaluator implements ActionEvaluator {

	private static final long serialVersionUID = 0L;

	/**
	 * @see org.alfresco.web.action.ActionEvaluator#evaluate(org.alfresco.web.bean.repository.Node)
	 */
	public boolean evaluate(Node node) {

		// if the aspect hasn't been added, it cannot be disabled
		if (!node.hasAspect(SomeCoModel.ASPECT_SC_WEBABLE)) {
			return false;
		}
		
		// otherwise, check the group, then check the active property
		FacesContext context = FacesContext.getCurrentInstance();
		
		// check the group
		if (!GroupMembershipCheck.isCurrentUserInGroup(context, Constants.GROUP_WEB_PUBLISHER)) {
			return false;
		}

		// check the active property
		NodeRef ref = new NodeRef(Repository.getStoreRef(), node.getId());
		NodeService nodeSvc = Repository.getServiceRegistry(context).getNodeService();
        boolean active = (Boolean)nodeSvc.getProperty(ref, SomeCoModel.PROP_IS_ACTIVE);
		
        return active;
   	}

	public boolean evaluate(Object obj) {
		if (obj instanceof Node) {
			return evaluate((Node)obj);
		} else {
			// if you don't give me a Node, I don't know how to evaluate
			return false;
		}
	}

}